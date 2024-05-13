import {TagsDataProps} from '../types';

export const tags: TagsDataProps = {
  Debit: {
    keywords: [' debited ', ' withdrawn ', 'Sent '],
    data: [],
  },
  Credit: {
    keywords: [
      ' credited ',
      'Received ',
      ' has credit ',
      'transferred to your',
    ],
    data: [],
  },
  Balance: {
    keywords: [],
    data: [],
  },
  UPI: {
    keywords: [' upi '],
    data: [],
  },
  Banks: {
    keywords: [' bank '],
    data: [],
  },
  Finance: {
    keywords: [''],
    data: [],
  },
  Trains: {
    keywords: ['PNR '],
    data: [],
  },
  Refund: {
    keywords: ['refund '],
    data: [],
  },
  'Failed Transaction': {
    keywords: [' declined '],
    data: [],
  },
  'Contact Availability': {
    keywords: [' available to take calls'],
    data: [],
  },
  'Missed Calls': {
    keywords: [' missed call '],
    data: [],
  },
  'Credit Cards': {
    keywords: [' credit card '],
    data: [],
  },
  'Debit Cards': {
    keywords: [' debit card '],
    data: [],
  },
  Shopping: {
    keywords: [' shopping '],
    data: [],
  },
  Foods: {
    keywords: [' food ', ' swiggy ', ' zomato '],
    data: [],
  },
  OTP: {
    keywords: [' otp ', 'do not share this code'],
    data: [],
  },
  Personal: {
    keywords: [],
    data: [],
  },
  Others: {
    keywords: [],
    data: [],
  },
};
