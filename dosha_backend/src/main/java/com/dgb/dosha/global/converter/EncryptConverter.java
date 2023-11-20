package com.dgb.dosha.global.converter;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;

import javax.annotation.PostConstruct;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import org.springframework.security.crypto.codec.Hex;

@Converter
public class EncryptConverter implements AttributeConverter<String, String> {
	private String key ="2236350";
	private Cipher encryptCipher;
	private Cipher decryptCipher;

	@PostConstruct
	public void init() throws Exception {
		encryptCipher = Cipher.getInstance("AES");
		encryptCipher.init(Cipher.ENCRYPT_MODE, generateMySQLAESKey(key, "UTF-8"));
		decryptCipher = Cipher.getInstance("AES");
		decryptCipher.init(Cipher.DECRYPT_MODE, generateMySQLAESKey(key, "UTF-8"));
	}
	
	@Override
	public String convertToDatabaseColumn(String attribute) {
		try {
			return new String(Hex.encode(encryptCipher.doFinal(attribute.getBytes(StandardCharsets.UTF_8)))).toUpperCase();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public String convertToEntityAttribute(String dbData) {
		try {
			return new String(decryptCipher.doFinal(Hex.decode(dbData)));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static SecretKeySpec generateMySQLAESKey(final String key, final String encoding) {
		try {
			final byte[] finalKey = new byte[16];
			int i = 0;
			for (byte b: key.getBytes(encoding))
				finalKey[i++%16] ^= b;
			return new SecretKeySpec(finalKey, "AES");
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		}
	}
}