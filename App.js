import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, Button } from "react-native";
import { firestore, collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from "./firebaseconfig"; // Import Firestore functions
import { EvilIcons } from "@expo/vector-icons";

export default function App() {
  const [newItem, setNewItem] = useState('');
  const [state, setState] = useState([]); 


  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'items'));
      const itemsArray = querySnapshot.docs.map(doc => ({
        id: doc.id, 
        text: doc.data().text,
      }));
      setState(itemsArray); 
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const Save = async () => {
    try {
      const docRef = await addDoc(collection(firestore, 'items'), {
        text: newItem,
        created: serverTimestamp(),
      });
      setNewItem('');
      fetchItems();
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

 
  const Remove = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'items', id));
      fetchItems();
      console.log(`Document with ID: ${id} deleted`);
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Add new item..."
          value={newItem}
          onChangeText={text => setNewItem(text)}
        />
        <Button title="Save" onPress={Save} />
      </View>
      <FlatList
        data={state}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.text}</Text>
            <EvilIcons
              style={styles.icon}
              name="trash"
              size={24}
              color="black"
              onPress={() => Remove(item.id)}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  form: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 24,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 18,
  },
  icon: {
    paddingLeft: 16,
  },
});
