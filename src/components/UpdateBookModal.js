import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from './atom/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CreateBook, UpdateBook} from '../../util/Helpers';
import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_MODAL} from '../../slice/crudSlice';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker'

const UpdateBookModal = ({handleCloseUpdateModal}) => {
  const showModal = useSelector(state => state.books.updateModalOpen);
  const loading = useSelector(state => state.books.loading);
  const placehoderData = useSelector(state => state.books.PlaceHolder);

  const [author, setAuthor] = useState();
  const [title, setTitle] = useState();

  /** NU AM MAI AVUT TIMP SA ADAUG VALOAREA INTIALA, SRY :) */
  
  // if (placehoderData?.title || placehoderData?.author) {
  //   setTitle(placehoderData?.title)
  //   setAuthor(placehoderData?.author)
  // }

  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const startDate = selectedStartDate ? moment(selectedStartDate).format('YYYY-MM-DD').toString() : moment(placehoderData?.date).format('YYYY-MM-DD').toString();

  const [titleError, setTitleError] = useState();
  const [authorError, setAuthorError] = useState();

  const dispatch = useDispatch();
  let handleUpdateBook = () => {
    let data = {
      title,
      author,
      date: startDate,
      id: placehoderData.id,
    };

    if (title && author) {
      UpdateBook(dispatch, data);
    } else {
      if (!author) {setAuthorError("Editati campul autor")} else {setAuthorError("")}
      if (!title) {setTitleError("Editati campul titlu")} else {setTitleError("")}
    }
  };
  return (
    <Modal transparent visible={showModal} animationType="slide">
      <Pressable
        onPress={handleCloseUpdateModal}
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />

      <View style={styles.modalCard}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            marginTop: 4,
            alignSelf: 'center',
            borderWidth: 1,
            padding: 5,
          }}>
          Update Quote
        </Text>
        <KeyboardAwareScrollView>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 5,
            }}>
            <View
              style={{
                width: '100%',
              }}>
              <Text style={{color: 'black', fontSize: 20, marginBottom: 10}}>
                Author
              </Text>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#f1f1f1',
                  borderRadius: 5,
                }}>
                <TextInput
                  defaultValue={`${placehoderData?.author}`}
                  onChangeText={setAuthor}
                  style={{padding: 5, height: 50, color: 'black'}}
                />
                <Text style={styles.error}>{authorError}</Text>
              </View>
            </View>
          </View>

          {/*  AREA */}
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            <View
              style={{
                width: '100%',
              }}>
              <Text style={{color: 'black', fontSize: 20, marginBottom: 10}}>
                Titlu
              </Text>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#f1f1f1',
                  borderRadius: 5,
                }}>
                <TextInput
                  onChangeText={setTitle}
                  defaultValue={`${placehoderData?.title}`}
                  style={{padding: 5, height: 50, color: 'black'}}
                />
                <Text style={styles.error}>{titleError}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: '10%',
            }}>
            <View
              style={{
                width: '100%',
              }}>
              <Text style={{color: 'black', fontSize: 20, marginBottom: 10}}>
                Data publicarii: {startDate}
              </Text>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#f1f1f1',
                  borderRadius: 5,
                }}>
                  <CalendarPicker initialDate={startDate} onDateChange={setSelectedStartDate} />
              </View>
            </View>
          </View>
          {!loading ? (
            <Button
              onPress={handleUpdateBook}
              text={'Save'}
              textStyle={styles.btnText}
              style={styles.btn}
            />
          ) : (
            <ActivityIndicator
              style={{alignSelf: 'flex-end', marginRight: 20, marginTop: 20}}
              size={30}
              color={'tomato'}
            />
          )}
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

export default UpdateBookModal;

const styles = StyleSheet.create({
  btn: {
    width: 80,
    height: 40,
    backgroundColor: 'tomato',
    marginTop: 20,
    alignSelf: 'flex-end',
    borderRadius: 5,
    marginRight: 18,
    justifyContent: 'center',
    marginBottom: 20,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  modalCard: {
    width: '90%',
    height: '60%',
    zIndex: 100,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: '30%',
    justifyContent: 'center',
    borderRadius: 10,
  },
  error: {
    color: "red",
  },
});
