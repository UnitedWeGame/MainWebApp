package com.UnitedWeGame.services;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.stereotype.Service;

import com.twilio.sdk.TwilioRestClient;
import com.twilio.sdk.TwilioRestException;
import com.twilio.sdk.resource.factory.MessageFactory;
import com.twilio.sdk.resource.instance.Message;

@Service
public class TwilioService {
    // Find your Account Sid and Token at twilio.com/user/account
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");//"ACf3f2a39c143d6c5c625bde94fa013e03";
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");//"ada00ccad829b40d420aaee4d3d9b8e8";
    public static final String TWILIO_NUMBER = System.getenv("TWILIO_NUMBER");//"+13852356348";
    
    public void sendSMS(String phoneNum, String body) {
        try {
            TwilioRestClient client = new TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN);
     
            // Build a filter for the MessageList
            List<NameValuePair> params = new ArrayList<NameValuePair>();
            params.add(new BasicNameValuePair("Body", body));
            params.add(new BasicNameValuePair("To", phoneNum)); 
            params.add(new BasicNameValuePair("From", TWILIO_NUMBER));

            MessageFactory messageFactory = client.getAccount().getMessageFactory();
            Message message = messageFactory.create(params);
            System.out.println(message.getSid());
        } 
        catch (TwilioRestException e) {
            System.out.println(e.getErrorMessage());
        }
    }
}
