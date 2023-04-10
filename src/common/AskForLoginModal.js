import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';

const AskForLoginModal = ({
  modalVisible,
  onClickLogin,
  onClickSignUp,
  onClose,
}) => {
  return (
    <Modal visible={modalVisible} transparent>
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <TouchableOpacity
            style={[styles.btn, {marginTop: 50}]}
            onPress={() => {
              onClickLogin();
            }}>
            <Text style={styles.btnText}>{'Login'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, {marginTop: 20, marginBottom: 20}]}
            onPress={() => {
              onClickSignUp();
            }}>
            <Text style={styles.btnText}>{'Create Account'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearBtn} onPress={onClose}>
            <Image
              source={require('../images/close.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AskForLoginModal;
const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 200,
    width: '90%',
  },
  btn: {
    width: '80%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'orange',
    // marginTop: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  icon: {
    width: 24,
    height: 24,
  },
  clearBtn: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
});
