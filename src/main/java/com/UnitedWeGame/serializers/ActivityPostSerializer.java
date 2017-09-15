package com.UnitedWeGame.serializers;

import java.io.IOException;

import com.UnitedWeGame.models.ActivityPost;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class ActivityPostSerializer extends StdSerializer<ActivityPost> {
    
    public ActivityPostSerializer() {
        this(null);
    }
   
    public ActivityPostSerializer(Class<ActivityPost> t) {
        super(t);
    }
 
    @Override
    public void serialize(
      ActivityPost value, JsonGenerator jgen, SerializerProvider provider) 
      throws IOException, JsonProcessingException {
        jgen.writeStartObject();
        jgen.writeNumberField("id", value.getId());
        jgen.writeNumberField("userId", value.getUser().getId());
        jgen.writeStringField("username", value.getUser().getUsername());
        jgen.writeStringField("content", value.getContent());
        jgen.writeStringField("timestamp", value.getCreatedDate().toGMTString());
        jgen.writeEndObject();
    }
}
