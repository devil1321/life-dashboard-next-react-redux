import React from 'react'
import Layout from '../components/layout.component'
import Settings from '../components/settings-components/settings.components'
import Form from '../components/form-components/form.components'
import WheatherWidget from '../components/wheather-widget.component'
import { fetchWheather } from '../modules/api.module'
import { WheatherProps } from '../interfaces'

interface SettingProps {
  data:{
      wheather:WheatherProps
  }
}

const SettingsPage:React.FC<SettingProps> = ({data}) => {

  return (
    <Layout title="Settings">
      <div className="settings">
        <div className="settings__main">
          <Form.SettingsForm />
        </div>
        <div className="settings__widget-wrapper">
          <Settings.Widget />
          <WheatherWidget data={data.wheather}/>
        </div>
      </div>
    </Layout>
  )

}

export default SettingsPage

export async function getStaticProps(){
  
  const wheather = await fetchWheather()
  return {
      props:{
         data:{
             wheather:wheather
         }
      }
  }

}