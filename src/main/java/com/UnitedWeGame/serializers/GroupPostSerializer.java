package com.UnitedWeGame.serializers;

import java.io.IOException;

import com.UnitedWeGame.models.GroupPost;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class GroupPostSerializer extends StdSerializer<GroupPost> {

    public GroupPostSerializer() {
        this(null);
    }

    public GroupPostSerializer(Class<GroupPost> t) {
        super(t);
    }

    @Override
    public void serialize(
            GroupPost value, JsonGenerator jgen, SerializerProvider provider)
            throws IOException, JsonProcessingException {
        jgen.writeStartObject();
        jgen.writeNumberField("id", value.getId());
        jgen.writeNumberField("groupId", value.getGroupId());
        jgen.writeNumberField("userId", value.getUser().getId());
        jgen.writeStringField("username", value.getUser().getUsername());
        jgen.writeStringField("content", value.getContent());
        jgen.writeStringField("imageUrl", value.getUser().getImageUrl());
        if(value.getCreatedDate() != null)
            jgen.writeStringField("timestamp", value.getCreatedDate().toGMTString());
        jgen.writeEndObject();
    }
}
