import {View, Text, Button, StyleSheet} from 'react-native'
import React from 'react'
import {constants} from 'expo'
import {vibrate} from './utils'

const styles = StyleSheet.create({
    appContainer: {
        flex:1,
        fontSize:48,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default class CountDown extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            work: true,
            play: false,
            text: 'STUDY TIME',
            countMin1: 0,
            countMin2: 0,
            countSec1: 1,
            countSec2: 0,
        }
    }

    startCount = () => {
        this.setState({play: true})
        this.interval = setInterval(this.countdown,1000)
    }

    stopCount = () => {
        this.setState({play: false})
        clearInterval(this.interval)
    }

    resetCount = () => {
        clearInterval(this.interval)
        this.setState({
            work: true,
            play: false,
            text: 'STUDY TIME',
            countMin1: 0,
            countMin2: 0,
            countSec1: 1,
            countSec2: 0,
        })
    }

    countdown = () => {
        this.setState(prevState => ({countSec2: prevState.countSec2 - 1}))

        if (this.state.countMin1 == 0 && this.state.countMin2 == 0 && this.state.countSec1 == 0 && this.state.countSec2 < 0) {
            vibrate(30)
            this.setState(prevState =>({work: !prevState.work}))

            if (this.state.work){
                this.setState(prevState => ({
                    text: 'STUDY TIME',
                    countMin1: 0,
                    countMin2: 0,
                    countSec1: 1,
                    countSec2: 0,
                }))
            }
            if (!this.state.work){
                this.setState(prevState => ({
                    text: 'BREAK TIME',
                    countMin1: 0,
                    countMin2: 0,
                    countSec1: 3,
                    countSec2: 0,
                }))
            }
        }

        if (this.state.countSec2 < 0) {
                this.setState(prevState => ({
                countSec2: 9,
                countSec1: prevState.countSec1 - 1,
            }))
        }

        if (this.state.countSec1 < 0)    {
            this.setState(prevState => ({
                countSec1: 5,
                countMin2: prevState.countMin2 - 1,
            }))
        }

        if (this.state.countMin2 < 0) {
            this.setState(prevState => ({
                countMin2: 9,
                countMin1: prevState.countMin1 - 1,
            }))
        }
    }

    render() {
        if(!this.state.play) {
            return(
            <View style={styles.appContainer}>
            <Text> POMODORO TIMER </Text>
            <Button title= 'START' onPress={this.startCount} />
            <Text> {this.state.text} </Text>
            <Text>{this.state.countMin1} {this.state.countMin2} : {this.state.countSec1} {this.state.countSec2} </Text>
            <Button title='RESET' onPress={this.resetCount} />
            </View>
            )
        }
        else {
            return(
            <View style={styles.appContainer}>
            <Text> POMODORO TIMER </Text>
            <Button title= 'STOP' onPress={this.stopCount} />
            <Text> {this.state.text} </Text>
            <Text>{this.state.countMin1} {this.state.countMin2} : {this.state.countSec1} {this.state.countSec2} </Text>
            <Button title='RESET' onPress={this.resetCount} />
            </View>
            )
        }
    }
}