package com.finnancemanager

import android.content.ContentResolver
import android.content.Context
import android.net.Uri
import android.provider.Telephony
import android.provider.Telephony.TextBasedSmsColumns

fun Context.getAllSms(): MutableList<Map<String, Any>> {
    val contentResolver: ContentResolver = this.contentResolver

    val uri: Uri = Telephony.Sms.Inbox.CONTENT_URI
    val projection = arrayOf(
        Telephony.Sms._ID,
        TextBasedSmsColumns.THREAD_ID,
        TextBasedSmsColumns.DATE,
        TextBasedSmsColumns.DATE_SENT,
        TextBasedSmsColumns.ADDRESS,
        TextBasedSmsColumns.BODY,
    )
    val selection = "${Telephony.Sms.ADDRESS} LIKE ?"
    val selectionArgs = arrayOf("")

    val sortOrder = "${Telephony.Sms.DATE} ASC"
    val cursor = contentResolver.query(uri, projection, null, null, sortOrder)

    val smsList = mutableListOf<Map<String, Any>>()

    cursor?.use {
        while (it.moveToNext()) {
            val smsMap = mutableMapOf<String, Any>()
            for (i in 0 until it.columnCount) {
                val columnName = it.getColumnName(i)
                val columnValue = when (columnName) {
                    TextBasedSmsColumns.DATE, TextBasedSmsColumns.DATE_SENT -> it.getLong(i)
                    Telephony.Sms._ID, TextBasedSmsColumns.THREAD_ID -> it.getInt(i)
                    else -> it.getString(i)
                }
                smsMap[columnName] = columnValue ?: ""
            }
            smsList.add(smsMap)
        }
    }
    return smsList
}
