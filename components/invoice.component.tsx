import React,{ useState, useEffect } from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });
  

  const Invoice = () => {

    const [test,setTest] = useState<string>("ddd")
    

    useEffect(()=>{
        setTimeout(()=>{
            setTest('123213123')
        },5000)
        fetch('/api/download-invoice')
            .then(res => res.data)
            .catch(err => console.log(err))

    },[])
    return(
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Section sadasd#1s {test}</Text>
            </View>
            <View style={styles.section}>
              <Text>Section #2</Text>
            </View>
          </Page>
        </Document>
  );
}

export default Invoice



