package com.quicksure.pc.consumer.utils;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.stereotype.Component;

@Component
public class OperateRedis {
	@SuppressWarnings("rawtypes")
	@Resource(name="redisTemplate")
	private RedisTemplate redisTemplate;
	
	@SuppressWarnings("unchecked")
	public void saveObject(final Object object,final String keystring){
		redisTemplate.execute(new RedisCallback<Boolean>() {
			public Boolean doInRedis(RedisConnection connection)
					throws DataAccessException {
				RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
				byte[] key = serializer.serialize(keystring);
				byte[] value = SerializeUtil.serialize(object);
				connection.set(key, value);
				//设置key的过期时间，1天 = 86400秒
				connection.expire(key, 86400);
				return true;
			}
		});
	}
	
	@SuppressWarnings("unchecked")
	public Object getObject(final String getkey){
		Object result= redisTemplate.execute(new RedisCallback<Object>() {
			public Object doInRedis(RedisConnection connection)
					throws DataAccessException {
				RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
				byte[] key = serializer.serialize(getkey);
				if(connection.exists(key)){
					byte[] valuebytes = connection.get(key);
					Object object = (Object) SerializeUtil.unserialize(valuebytes);
					return object;
				}
				return null;
				}
		});
		return result;
	}
	
	@SuppressWarnings("unchecked")
	public void addToHash(final Map<String,Object> map,final String keyId){
		redisTemplate.execute(new RedisCallback<Boolean>() {
			public Boolean doInRedis(RedisConnection connection)
					throws DataAccessException {
				RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
				for (String str : map.keySet()) {
					byte[] key =  serializer.serialize(keyId);
					byte[] field = serializer.serialize(str);
					byte[] value = SerializeUtil.serialize(map.get(str));
					connection.hSet(key, field, value);
					//设置key的过期时间，1天 = 86400秒
					connection.expire(key, 86400);
				}
				return true;
			}
		});
	}
	
	@SuppressWarnings("unchecked")
	public Map<byte[], byte[]> getHash(final String keyId){
		Map<byte[], byte[]> result = (Map<byte[], byte[]>)redisTemplate.execute(new RedisCallback<Map<byte[], byte[]>>() {
			public Map<byte[], byte[]> doInRedis(RedisConnection connection)
					throws DataAccessException {
				RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
				byte[] key = serializer.serialize(keyId);
				Map<byte[], byte[]> map = connection.hGetAll(key);
				return map;
			}
		});
		return result;
	}
}
