import React,{ useState } from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import { useSelector  } from 'react-redux'
import { State } from '../controllers/reducers'
import { InvoicesFormDataParams } from '../interfaces';

const styles = StyleSheet.create({
    page: {
        padding:'0px 20px'
    },
    header:{
        display:"flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    heading:{
       marginBottom:"20px",
       fontWeight:"bold",
       textDecoration:'underline',
    },
    company: {
      margin: 0,
      padding: "5px 0px",
      fontSize:"16px"
    },
    largeHeading:{
        margin:"100px 0px 50px",
        textAlign:"center",
        fontSize:"50px"
    },
    
    table:{
        border:"1px solid black"
    },
    tableRow:{
        display:"flex",
        flexDirection: "row",
        justifyContent: "center",
        textAlign:'center',
    
    },
    tableCeil:{
        width:"140px",
        texAlign:"center",
        padding:"0px 10px",
        borderRight:'1px solid black',
        borderBottom:'1px solid black'
    },
    lastCeil:{
        width:"140px",
        texAlign:"center",
        padding:"0px 10px",
        borderRight:'1px solid black',
        borderBottom:'1px solid black'
    },
    signature:{
        marginTop:"200px",
        marginLeft:"350px",
        fontSize: "16px",
    }
  });
  

  const Invoice:React.FC<InvoicesFormDataParams> = ({formData}) => {
    const { invoiceNR, money, tax, bonuses, nip, firstName, lastName, adress, zip, city, company } = formData


    const [test,setTest] = useState<string>("ddd")
    const [test2,setTest2] = useState<string>("ddddddd")
    
    return(
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header} >
                <View>
                  <Text style={styles.heading}>Employee</Text>
                  <Text style={styles.company}>First Name: </Text>
                  <Text style={styles.company}>Last Name: </Text>
                  <Text style={styles.company}>Company: </Text>
                  <Text style={styles.company}>NIP: </Text>
                </View>
                <View>
                  <Text style={styles.heading}>Person</Text>
                  <Text style={styles.company}>First Name:{lastName} </Text>
                  <Text style={styles.company}>Last Name:{firstName} </Text>
                  <Text style={styles.company}>Company:{company} </Text>
                  <Text style={styles.company}>Adress: {adress} </Text>
                  <Text style={styles.company}>{zip} {city} </Text>
                </View>
            </View>
            <View style={styles.largeHeading}>
                <Text>Invoice</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCeil}>Invoice.NR </Text>
                    <Text style={styles.tableCeil}>Tax</Text>
                    <Text style={styles.tableCeil}>Bonuses</Text>
                    <Text style={styles.lastCeil}>Money</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCeil}>{invoiceNR}</Text>
                    <Text style={styles.tableCeil}>{tax}</Text>
                    <Text style={styles.tableCeil}>{bonuses}</Text>
                    <Text style={styles.lastCeil}>{money  + bonuses - ((money + bonuses) * (tax / 100))}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.signature}>{"Employer\'s signature"}</Text>
            </View>
          </Page>
        </Document>
  );
}

export default Invoice



