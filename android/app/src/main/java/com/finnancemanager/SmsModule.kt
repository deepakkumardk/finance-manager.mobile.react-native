package com.finnancemanager

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap

class SmsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var context: ReactApplicationContext

    init {
        this.context = reactContext
    }

    override fun getName() = "SmsModule"

    @ReactMethod
    fun getAllSms(promise: Promise) {
        val smsList = context.getAllSms()
        val writeableArray = convertListMapToWritableArray(smsList)
        promise.resolve(writeableArray)
    }

    private fun convertListMapToWritableArray(list: List<Map<String, Any>>): WritableArray {
        val array = Arguments.createArray()

        for (map in list) {
            val writableMap = convertMapToWritableMap(map)
            array.pushMap(writableMap)
        }

        return array
    }

    private fun convertMapToWritableMap(map: Map<String, Any>): WritableMap {
        val writableMap = Arguments.createMap()

        for ((key, value) in map) {
            when (value) {
                is String -> writableMap.putString(key, value)
                is Int -> writableMap.putInt(key, value)
                is Long -> writableMap.putString(key, value.toString())
                is Double -> writableMap.putDouble(key, value)
                is Boolean -> writableMap.putBoolean(key, value)
                else -> {
                    Log.w("TAG", "This type is not supported.")
                }
            }
        }

        return writableMap
    }
}