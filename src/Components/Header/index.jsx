import './Header.module.css'

const Header = (props) => {
  return ( 
    <header data-testid="todo-header">
    <h1 data-testid="todo-h1">To Do List: {props.incomplete.length} items pending</h1>
  </header>

   );
}
 
export default Header;