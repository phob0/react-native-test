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
import React, {useState} from 'react';
import Button from './atom/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CreateBook} from '../../util/Helpers';
import {useDispatch, useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker'
import {MODAL} from '../../slice/crudSlice';

const AppModal = ({handleCloseModal}) => {
  const showModal = useSelector(state => state.quotes.modalOpen);
  const loading = useSelector(state => state.quotes.loading);
  const [author, setAuthor] = useState();
  const [title, setTitle] = useState();


  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const startDate = selectedStartDate ? moment(selectedStartDate).format('YYYY-MM-DD').toString() : '';

  const dispatch = useDispatch();
  handleAddQuote = () => {
    let data = {
      title,
      author,
      date: moment(selectedStartDate).format('YYYY-MM-DD').toString()
    };
    if (title && author) {
      CreateBook(dispatch, data);
    }
  };
  return (
    <Modal transparent visible={showModal} animationType="slide">
      <Pressable
        onPress={() => dispatch(MODAL(false))}
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />

      <View style={styles.modalCard}>
        <KeyboardAwareScrollView>
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
                Autor
              </Text>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#f1f1f1',
                  borderRadius: 5,
                }}>
                <TextInput
                  onChangeText={setAuthor}
                  style={{padding: 5, height: 50, color: 'black'}}
                />
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
                  style={{padding: 5, height: 50, color: 'black'}}
                />
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
                  <CalendarPicker onDateChange={setSelectedStartDate} />
              </View>
            </View>
          </View>

          {!loading ? (
            <Button
              onPress={handleAddQuote}
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

export default AppModal;

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
});
