import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    enteredList: [],
    showPassword: false,
    searchInput: '',
  }

  onWebsite = event => {
    this.setState({website: event.target.value})
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSubmitForm = event => {
    event.preventDefault()
    this.setState(prevState => ({
      enteredList: [
        ...prevState.enteredList,
        {
          id: uuidv4(),
          website: prevState.website,
          username: prevState.username,
          password: prevState.password,
        },
      ],
      website: '',
      username: '',
      password: '',
    }))
  }

  onDelete = uniqueId => {
    this.setState(prevState => ({
      enteredList: prevState.enteredList.filter(item => item.id !== uniqueId),
    }))
  }

  render() {
    const {
      website,
      username,
      password,
      enteredList,
      showPassword,
      searchInput,
    } = this.state
    const filteredSearchInput = enteredList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log(filteredSearchInput)
    return (
      <div className="bg-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo"
        />
        <div className="inputs-image-cont">
          <div className="inputs-cont">
            <form className="form" onSubmit={this.onSubmitForm}>
              <h1 className="form-head">Add New Password</h1>
              <div className="input-cont">
                <img
                  className="input-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  onChange={this.onWebsite}
                  value={website}
                />
              </div>
              <div className="input-cont">
                <img
                  className="input-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  onChange={this.onUsername}
                  value={username}
                />
              </div>
              <div className="input-cont">
                <img
                  className="input-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  onChange={this.onPassword}
                  value={password}
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="side-img"
            alt="password manager"
          />
        </div>
        <div className="inputs-image-cont pass-cont">
          <div className="count-search-cont">
            <div className="pass-count-cont">
              <h1 className="your-pass">Your Passwords</h1>
              <p className="count">{enteredList.length}</p>
            </div>
            <div className="input-cont search-cont">
              <img
                className="input-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                className="input"
                onChange={this.onSearch}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="check-box-cont">
            <input
              type="checkbox"
              id="showPasswords"
              name="showPasswords"
              value="show passwords"
              onChange={this.onShowPassword}
            />
            <label htmlFor="showPasswords" className="showPasswords">
              Show Passwords
            </label>
          </div>
          {enteredList.length === 0 ||
          (searchInput.length !== 0 && filteredSearchInput.length === 0) ? (
            <>
              <img
                className="down-img"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="no-pass">No Passwords</p>
            </>
          ) : (
            <ul className="list-cont">
              {searchInput === ''
                ? enteredList.map(eachItem => (
                    <PasswordItem
                      details={eachItem}
                      key={eachItem.id}
                      onChangeShowPass={showPassword}
                      onRemovePass={this.onDelete}
                    />
                  ))
                : filteredSearchInput.map(eachItem => (
                    <PasswordItem
                      details={eachItem}
                      key={eachItem.id}
                      onChangeShowPass={showPassword}
                      onRemovePass={this.onDelete}
                    />
                  ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default PasswordManager
