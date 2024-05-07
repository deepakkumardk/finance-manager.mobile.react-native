package com.finnancemanager

import android.content.ContentResolver
import android.content.Context
import android.database.Cursor
import android.net.Uri
import android.provider.Telephony
import com.facebook.react.bridge.ReadableArray

fun Context.getAllSms(sendersCode: ReadableArray): MutableList<Map<String, Any>> {
    val contentResolver: ContentResolver = this.contentResolver
    val size = sendersCode.size()

    val uri: Uri = Telephony.Sms.Inbox.CONTENT_URI
    val selection = "${Telephony.Sms.ADDRESS} LIKE ?"
    val selectionArgs = Array(size) { "" }
        for (i in 0 until size) {
            val value = sendersCode.getString(i)
            selectionArgs[i] = value ?: ""
        }

    val sortOrder = "${Telephony.Sms.DATE} ASC"
    val cursor = contentResolver.query(uri, null, null, null, sortOrder)

    val smsList = mutableListOf<Map<String, Any>>()

    cursor?.use {
        while (it.moveToNext()) {
            val smsMap = mutableMapOf<String, Any>()
            for (i in 0 until it.columnCount) {
                val columnName = it.getColumnName(i)
                val columnValue = when (it.getType(i)) {
                    Cursor.FIELD_TYPE_INTEGER -> it.getInt(i)
                    Cursor.FIELD_TYPE_FLOAT -> it.getFloat(i)
                    Cursor.FIELD_TYPE_STRING -> it.getString(i)
                    Cursor.FIELD_TYPE_BLOB -> it.getBlob(i)
                    else -> null
                }
                smsMap[columnName] = columnValue ?: ""
            }
            smsList.add(smsMap)
        }
    }
    return smsList
}
