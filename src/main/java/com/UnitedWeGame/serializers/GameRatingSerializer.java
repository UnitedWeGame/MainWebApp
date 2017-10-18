package com.UnitedWeGame.serializers;

import java.io.IOException;

import com.UnitedWeGame.models.GameRating;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class GameRatingSerializer extends StdSerializer<GameRating> {
    
    public GameRatingSerializer() {
        this(null);
    }
   
    public GameRatingSerializer(Class<GameRating> t) {
        super(t);
    }
 
    @Override
    public void serialize(
      GameRating value, JsonGenerator jgen, SerializerProvider provider) 
      throws IOException, JsonProcessingException {
  
        jgen.writeStartObject();
        jgen.writeNumberField("id", value.getId());
        jgen.writeStringField("username", value.getUser().getUsername());
        jgen.writeNumberField("userId", value.getUser().getId());
        jgen.writeStringField("imageUrl", value.getUser().getImageUrl());
        jgen.writeStringField("review", value.getReview());
        jgen.writeNumberField("rating", value.getRating());
        jgen.writeEndObject();
    }
}
