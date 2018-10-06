import React from 'react'
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import find from '../helpers/find'

export default class IndexScreen extends React.Component {
  state = {
    word: [],
    load: false
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
      <View> 
        <ScrollView>
          <View style={{flexDirection: 'row', flex: 1}}>
            <TextInput
              style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={(query) => this.setState({ query })}
              value={this.state.query}
            />
            <TouchableOpacity
              style={{flex: 0.1}}
              onPress={() => this.matchFind(this.state.query)}>
              <Text style={{fontSize: 20}}>Cari</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
          {this.state.load && <ActivityIndicator />}
          {this.state.word && this.state.word.map((w, i) => (
            <Text key={i}>{w}</Text>
          ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}