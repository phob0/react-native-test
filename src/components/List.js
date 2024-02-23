import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DeleteBook} from '../../util/Helpers';
import {PLACEHOLDER_DATA, UPDATE_MODAL} from '../../slice/crudSlice';

export default function List({item}) {
  const placehoderData = useSelector(state => state.books.PlaceHolder);
  let dispatch = useDispatch();
  let onPressRemove = () => {
    DeleteBook(dispatch, item?.id);
  };
  let onPressUpdate = () => {
    dispatch(PLACEHOLDER_DATA(item));
    if (placehoderData) {
      dispatch(UPDATE_MODAL(true));
    }
  };
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#ffff',
        marginVertical: 5,
        borderRadius: 5,
        padding: 5,
        elevation: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <Text
          onPress={onPressUpdate}
          style={{
            color: '#000',

            fontSize: 20,
            borderBottomWidth: 1,
            marginBottom: 10,
          }}>
          Update
        </Text>
        <Text
          onPress={onPressRemove}
          style={{
            color: '#000',
            // alignSelf: 'flex-end',
            fontSize: 20,
            borderBottomWidth: 1,
            marginBottom: 10,
          }}>
          Remove
        </Text>
      </View>
      <Text style={{color: '#000'}}>{item.title}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text style={{alignSelf: 'flex-end', color: '#000'}}>{item.date}</Text>
        <Text
          style={{alignSelf: 'flex-end', color: '#000', fontWeight: 'bold'}}>
          {item.author}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
