export interface SMSData {
  // Primary types
  _id: number;
  date: string;
  date_sent: string;

  address: string;
  body: string;

  // Calculated property
  fullBankName: string;
  date_display: string;

  // subject: string;
  // creator: string;
  // service_center: string;
  // thread_id: number;
  // status: number;
  // sub_id: number;
  // read: number;
  // seen: number;
  // type: number;
  // app_id: number;
  // bin_info: number;

  // // string types
  // announcements_scenario_id: string;
  // callback_number: string;
  // cmc_prop: string;
  // correlation_tag: string;
  // delivery_date: string;
  // device_name: string;
  // from_address: string;
  // group_id: string;
  // group_type: string;
  // link_url: string;
  // object_id: string;
  // person: string;
  // re_body: string;
  // re_content_type: string;
  // re_content_uri: string;
  // re_count_info: string;
  // re_file_name: string;
  // re_original_body: string;
  // re_original_key: string;
  // re_recipient_address: string;
  // sim_imsi: string;
  // svc_cmd_content: string;

  // // number types
  // announcements_subtype: number;
  // d_rpt_cnt: number;
  // deletable: number;
  // error_code: number;
  // favorite: number;
  // hidden: number;
  // locked: number;
  // msg_id: number;
  // pri: number;
  // protocol: number;
  // re_type: number;
  // reply_path_present: number;
  // reserved: number;
  // roam_pending: number;
  // safe_message: number;
  // secret_mode: number;
  // sim_slot: number;
  // spam_report: number;
  // svc_cmd: number;
  // teleservice_id: number;
  // using_mode: number;
}
