import React,{ useState, useEffect } from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import { useSelector  } from 'react-redux'
import { State } from '../controllers/reducers'
import { InvoicesFormDataParams } from '../interfaces';

const styles = StyleSheet.create({
    page: {
   
    },
    heading: {
      margin: 10,
      padding: 10,
      fontWeight:"bold"
    },
  });
  

  const Invoice:React.FC<InvoicesFormDataParams> = ({formData}) => {
    const { money } = formData
    // file:'',
    // invoiceNR:'',
    // money:0,
    // tax:0,
    // bonuses:0,
    // nip:'',
    // firstName:'',
    // lastName:'',
    // adress:'',
    // zip:'',
    // city:'',

    const [test,setTest] = useState<string>("ddd")
    const [test2,setTest2] = useState<string>("ddddddd")
    
    return(
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.heading}>
              <Text style={styles.heading}>First Name: </Text>
              <Text style={styles.heading}>Last Name: </Text>
              <Text style={styles.heading}>Company: </Text>
              <Text style={styles.heading}>NIP:d </Text>
              <Text style={styles.heading}>{money} </Text>
            </View>
            <View style={styles.section}>
              <Text>Section #2</Text>
            </View>
          </Page>
        </Document>
  );
}

export default Invoice



