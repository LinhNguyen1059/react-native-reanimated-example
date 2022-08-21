import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header';
import Modal from '../../components/modal';
import styles from './styles';

export default function ModalScreen() {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const toggleModal = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.content}>
          <TouchableOpacity onPress={toggleModal}>
            <Text>Press me 👋</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Modal
        isVisible={isVisible}
        backdropColor="#000000"
        onBackdropPress={toggleModal}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>This is modal content</Text>
        </View>
      </Modal>
    </View>
  );
}
