import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = height * 0.25;

const highlights = [
  { id: '1', title: 'Session 1', image: 'https://via.placeholder.com/600' },
  { id: '2', title: 'Session 2', image: 'https://via.placeholder.com/600' },
  { id: '3', title: 'Session 3', image: 'https://via.placeholder.com/600' },
];

const HighlightCarousel = ({highlights}) => {
  return (
    <Swiper style={styles.wrapper} showsPagination autoplay>
      {highlights.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.overlay}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: ITEM_HEIGHT,
    marginTop:10
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems:"center",
    backgroundColor: '#fff',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});

export default HighlightCarousel;
