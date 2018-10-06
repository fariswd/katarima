import React from 'react'
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native'
import find from '../helpers/find'

const {width, height} = Dimensions.get('window')

export default class IndexScreen extends React.Component {
  state = {
    word: [],
    load: false,
    lengt: '3',
  }
  matchFind(q, lengt = 2) {
    this.setState({load: true, word: []}, () => {
      find(q, lengt, (result) => {
        this.setState({
          load: false,
          word: result,
        })
      })

    })
  }
  render() {
    return (
      <View style={styles.container}> 
        <ScrollView style={{height: height, paddingTop: this.state.word.length < 1 ? height/4 : 0}}>
          <View style={{ flex: 1, paddingHorizontal: 8 }}>
            <View style={{
              flex: 1,
              paddingVertical: 20,
              paddingHorizontal: 20,
              }}>
              <View style={{flex: 1}} />
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
                <Text style={{fontSize: 30}}>Katarima</Text>
              </View>
            </View>
            <View style={{flex: 1}}>
              <View style={{flex: 1, borderWidth: 1, borderColor: 'lightgray', flexDirection: 'row'}}>
                <TextInput
                  style={{ flex: 1, height: 40, color: '#666' }}
                  onChangeText={(query) => this.setState({ query })}
                  value={this.state.query}
                  placeholder="Cari Kata"
                  returnKeyType="search"
                  onSubmitEditing={() => this.matchFind(this.state.query, this.state.lengt)}
                />
                <View style={{borderColor: 'lightgray', borderRightWidth: 1}} />
                <TextInput
                  style={{ flex: 0.1, height: 40, color: '#666', marginLeft: 8 }}
                  onChangeText={(lengt) => this.setState({ lengt })}
                  value={this.state.lengt}
                />
              </View>
              <Text style={{fontSize: 11, color: '#666', textAlign: 'right'}}>
                berapa huruf yang diambil untuk dicocokan pada kata^
              </Text>
              {this.state.word.length < 1 && <Text style={{fontSize: 16, color: '#666', textAlign: 'center', marginTop: 50}}>
                {`Cari kata yang berakhiran sama dalam Bahasa Indonesia.`}
              </Text>}
            </View>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10}}>
              {!this.state.load && this.state.word
                ? this.state.word.map((w, i) => (
                  <View
                    key={i}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      marginBottom: 5,
                      backgroundColor: `rgba(10,10,${i}, 0.5)`,
                      borderRadius: 20}}
                    >
                  <Text 
                    style={{fontSize: 18, color: '#f2f2f2'}}>
                    {w}
                  </Text>
                  </View>
                ))
                : <ActivityIndicator />
              }
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
})