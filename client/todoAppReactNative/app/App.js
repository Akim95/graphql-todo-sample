import React, { Component } from 'react';
import { 
    Container, 
    Header, 
    Title, 
    Content, 
    Body, 
    ListItem, 
    Text, 
    Spinner, 
    Form, 
    Item, 
    Input,
} from 'native-base';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

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
      <Container>
        <Header>
            <Body>
                <Title>Sample Todo App</Title>
            </Body>
        </Header>
        <Form>
            <Item>
                <Input
                    placeholder="Enter a new task"
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    onSubmitEditing={this.onHandleSubmit}
                />
            </Item>
        </Form>
        <Content>
            { loading ? <Spinner color='red' /> :
            todos.map(function(value) {
                return (
                <ListItem key={value.id}>
                    <Text>{value.task}</Text>
                </ListItem>
                )
            })
            }
        </Content>
    </Container>
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

const TodoWithDataAndMutation = compose(
  graphql(GET_TODO, {
    props({ data: { todos, loading } }) {
      return {
        todos,
        loading,
      }
  },
    options: () => ({ pollInterval: 1000 })
  }),
  graphql(TODO_MUTATION, {
    props({ mutate }) {
      return {
        submit(id, todoTask) {
          return mutate({ variables: { id, todoTask } });
        }
      };
    },
  })
)(App);

// export component with data and mutation
export default TodoWithDataAndMutation;
