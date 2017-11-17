package com.quicksure.pc.consumer.utils;

import java.util.HashMap;
import java.util.Map;

/**
 * The Class MapUtil.
 *
 * @Description: (这里用一句话描述这个类的作用)
 * @author liudongbo
 * @date 2017-3-9 16:20:33
 */
public class MapUtil {
	
	
	/**
	 * Resolve byte map.
	 *
	 * @param mapbyte the mapbyte
	 * @return the map
	 * @Description: 把Map<byte[], byte[]>类型的map转换成Map<String,Object>
	 * @author liudongbo
	 * @date 2017-3-9 16:20:33
	 */
	public static Map<String,Object> resolveByteMap(Map<byte[], byte[]> mapbyte){
		Map<String,Object> map = new HashMap<String, Object>();
		for (byte[] b : mapbyte.keySet()) {
			String key = new String(b);
			Object object = (Object) SerializeUtil.unserialize(mapbyte.get(b));
			map.put(key, object);
		}
		return map;
	}
}
