import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const RatingStars = ({ rating, onRatingChange, editable = false, size = 20 }) => {
  const renderStar = (index) => {
    const isFilled = index < rating;
    
    if (editable) {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => onRatingChange(index + 1)}
          style={styles.starButton}
        >
          <Text style={[styles.star, { fontSize: size, color: isFilled ? '#fbbf24' : '#d1d5db' }]}>
            ★
          </Text>
        </TouchableOpacity>
      );
    }
    
    return (
      <Text
        key={index}
        style={[styles.star, { fontSize: size, color: isFilled ? '#fbbf24' : '#d1d5db' }]}
      >
        ★
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, index) => renderStar(index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starButton: {
    padding: 2,
  },
  star: {
    marginHorizontal: 1,
  },
});

export default RatingStars;