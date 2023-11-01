import {Component} from 'react'
import './index.css'

class PasswordItem extends Component {
  render() {
    const {details, onChangeShowPass, onRemovePass} = this.props
    const removed = () => {
      onRemovePass(details.id)
    }
    return (
      <li className="list-item-cont">
        <div className="profile-cont">
          <h1 className="profile-letter">{details.website.toUpperCase()[0]}</h1>
        </div>
        <div className="pass-details-cont">
          <p className="details">{details.website}</p>
          <p className="details">{details.username}</p>
          {onChangeShowPass === true ? (
            <p className="details">{details.password}</p>
          ) : (
            <img
              className="stars"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </div>
        <button
          className="delete-btn"
          onClick={removed}
          type="button"
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </li>
    )
  }
}
export default PasswordItem
