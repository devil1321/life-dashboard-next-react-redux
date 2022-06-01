import React,{ useState } from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Field, InvoicesFormDataParams, UserDetails } from '../../interfaces';

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
    signature:{
        marginTop:"200px",
        marginLeft:"350px",
        fontSize: "16px",
    }
  });
  
  
  interface CustomInvoicePDFProps  {
    formData:InvoicesFormDataParams['formData'];
    fields:Field[]
    userDetails:UserDetails;
  }

  const CustomInvoicePDF:React.FC<CustomInvoicePDFProps> = ({formData,fields,userDetails}) => {

    const { invoiceNR, firstName, lastName, adress, zip, city, company } = formData
    const { name, surname, company:userCompany, nip:userNip, invoiceFields  } = userDetails

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
                  <Text style={styles.company}>NIP:{userNip} </Text>
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
            <View>
                {invoiceFields.length > 0 
                ? invoiceFields.map((field:any,index:number) => <Text key={index} style={field.isHeading ? styles.largeHeading : null}>{field.text}</Text>)
                : fields.map((field:any,index:number) => <Text key={index} style={field.isHeading ? styles.largeHeading : null}>{field?.text}</Text>)}
            </View>
            <View>
                <Text style={styles.signature}>{"Employer\'s signature"}</Text>
            </View>
          </Page>
        </Document>
  );
}

export default CustomInvoicePDF



