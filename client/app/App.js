import React, { Component } from 'react';
import {
  StatusBar,
  ToolbarAndroid,
  View,
  ScrollView ,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);

    // state
    this.state = {
      text: '',
    }

    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }
  onHandleSubmit() {
    const { submit } = this.props;
    const id = Math.floor((Math.random() * 5555) + 1);
    const task = this.state.text;

    // create a new task
    return submit(id, task).then(() => {

      // clear text field
      this.setState({ text: '' })
    });
  }
  render() {
    const { todos, loading } = this.props;
    return (
      <View style={Styles.container}>
          <StatusBar
            backgroundColor="#C2185B"
            barStyle="light-content"
          />
          <ToolbarAndroid
            style={Styles.toolBar}
            title="Todo App"
            titleColor="white"
          />
          <TextInput
            placeholder="Enter a new task"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            onSubmitEditing={this.onHandleSubmit}
          />
          <ScrollView>
            { loading ? <ActivityIndicator /> :
              _.map(todos, function(value) {
                return (
                  <View style={Styles.listItem} key={value.id}>
                    <Text>{value.task}</Text>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>

    );
  }
}

// query
const GET_TODO = gql`
  query getTodos {
    todos {
      id
      task
      completed
    }
  }
`;

// mutation
const TODO_MUTATION = gql`
  mutation createTodo($id: Int!, $todoTask: String!) {
    createTodo(id: $id, task: $todoTask) {
      id
    }
  }
`;

// make a query
const TodoWithData = graphql(GET_TODO, {
  props({ data: { todos } }) {
    return {
      todos,
    }
  },
  options: () => ({ pollInterval: 1000 })
})(App);


// make a mutation
const TodoWithDataAndMutation = graphql(TODO_MUTATION, {
  props({ mutate }) {
    return {
      submit(id, todoTask) {
        return mutate({ variables: { id, todoTask } });
      }
    };
  },
})(TodoWithData);

// stylesheet
const Styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    toolBar: {
      backgroundColor: '#E91E63',
      height: 50,
    },
    listItem: {
      padding: 10,
      borderBottomWidth: 0.5,
      borderColor: '#BDBDBD',
    }
});

// export component with data and mutation
export default TodoWithDataAndMutation;
