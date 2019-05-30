import React,{Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import {Header, Button, Spinner} from './component/common';
import LoginForm from './component/LoginForm';

class App extends Component{

    state={loggedIn:null};

    componentWillMount(){
        var config = {
            // Firebase API Details goes here 
        };
        firebase.initializeApp(config);
          
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({loggedIn: true});
            }else{
                this.setState({loggedIn: false});
            }
        });
    }

    renderContent(){
        switch(this.state.loggedIn){
            case true: 
                        return(  
                        <Button onPress={() => {firebase.auth().signOut()}}>
                            Log Out
                        </Button>
                        );
            case false:
                        return <LoginForm />;
            default:
                        return(
                                <Spinner size='large'/>
                        );
        }    
    }

    render(){
        return(
            <View>
                <Header headerText="Authentication"/>
                <View style={{height:40}}>
                    {this.renderContent()}
                </View>
            </View>
        );
    }
}

export default App; 