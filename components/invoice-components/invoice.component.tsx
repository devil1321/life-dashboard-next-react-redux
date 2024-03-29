import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { InvoicesFormDataParams, UserDetails } from '../../interfaces';

const styles = StyleSheet.create({
    page: {
        padding:'0px 20px'
    },
    invoiceNR:{
        width:'100%',
        textAlign:'center'
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
  
  interface InvoicePDFProps {
      formData:InvoicesFormDataParams['formData']
      userDetails:UserDetails;
  }

  const InvoicePDF:React.FC<InvoicePDFProps> = ({formData,userDetails}) => {

    const { invoiceNR, money, tax, bonuses, nip, firstName, lastName, adress, zip, city, company } = formData
    const { name, surname, company:userCompany, nip:userNip } = userDetails
    
    return(
        <Document>
          <Page size="A4" style={styles.page}>
            <View >
                <Text style={styles.invoiceNR}>NR. {invoiceNR}</Text>
            </View>
            <View style={styles.header} >
                <View>
                  <Text style={styles.heading}>Employee</Text>
                  <Text style={styles.company}>First Name:{name} </Text>
                  <Text style={styles.company}>Last Name:{surname} </Text>
                  <Text style={styles.company}>Company:{userCompany} </Text>
                  <Text style={styles.company}>NIP: {userNip}</Text>
                </View>
                <View>
                  <Text style={styles.heading}>Person</Text>
                  <Text style={styles.company}>First Name:{lastName} </Text>
                  <Text style={styles.company}>Last Name:{firstName} </Text>
                  <Text style={styles.company}>Company:{company} </Text>
                  <Text style={styles.company}>Adress: {adress} </Text>
                  <Text style={styles.company}>{zip} {city} </Text>
                  {nip.length !== 0 && <Text style={styles.company}>{nip} </Text>}
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
                    <Text style={styles.lastCeil}>{((Number(money) + Number(bonuses)) * (Number(tax) / 100)) + (Number(money)  + Number(bonuses))}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.signature}>{"Employer\'s signature"}</Text>
            </View>
          </Page>
        </Document>
  );
}

export default InvoicePDF



