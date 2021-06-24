import React from "react";
import {Formik, Form, Field} from 'formik';
import './login.css'
import {authMeThunk, loginThunk, LoginType} from "../../redux/app-reducer";
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux";
import {stateType} from "../../redux/store";
import {compose} from "redux";


type LoginComponentType = {
    myId: number | null
    isAuth: boolean
    authMeThunk: () => void
    loginThunk: (log: LoginType) => void
    wereRedirectWith: string
    isLoading: boolean
    loginMessageError: Array<string>
}

type LoginStateType = {
    showError: boolean
    localErrorMessage: string
}

class Login extends React.Component<LoginComponentType, LoginStateType> {
    constructor(props: LoginComponentType) {
        super(props);
        this.state = {
            showError: false,
            localErrorMessage: ''
        }
    }


    componentDidUpdate(prevProps: Readonly<LoginComponentType>, prevState: Readonly<{ showError: boolean }>, snapshot?: any) {
        if (prevProps.loginMessageError[0] !== this.props.loginMessageError[0] && this.props.loginMessageError.length) {
            this.setState({
                showError: true
            })
        }
    }


    render() {
        if (this.props.isAuth) {
            let url = this.props.wereRedirectWith
            if (url === '/profile/null') {
                url = `/profile/${this.props.myId}`
            }
            return <Redirect to={url}/>
        }
        return (<div className={'wrapper_login'}>
            <div className={'login_container'}>
                <h1>User login</h1>
                <Formik
                    initialValues={{email: '', password: '', RememberMe: false}}
                    validate={values => {
                        if (this.state.showError) {
                            this.setState({showError: false})
                        }else if(this.state.localErrorMessage){
                            this.setState({localErrorMessage:''})
                        }
                    }}
                    onSubmit={(values: LoginType, {setSubmitting}) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            this.setState({localErrorMessage: 'incorrect email'})
                        } else if (values.email && !values.password) {
                            this.setState({localErrorMessage: 'no password'})
                        } else {
                            this.setState({localErrorMessage: ''})
                            this.props.loginThunk(values)
                        }
                        setSubmitting(false)
                    }}
                >
                    {({isSubmitting}) => (
                        <Form >
                            <div className={'container_inputs'}>
                                <Field name="email"  placeholder='Email'/>
                                <Field type="password" name="password" placeholder='Password'/>
                                <div className={'errorMessage'}>{(!this.state.showError && this.state.localErrorMessage) &&<span>{this.state.localErrorMessage}</span>}</div>
                                <div className={'errorMessage'}>{this.state.showError && this.props.loginMessageError.map((mes, i) =>
                                    <span key={i}>{mes}</span>)}</div>
                            </div>
                            <div className={'container_remember'}>
                                <Field type='checkbox' name='checkbox'/>
                                <span>Remember me</span>
                            </div>
                            <div className={'container_button'}>
                                <button type="submit" disabled={isSubmitting}>
                                    Login
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>);
    }

}


const mapDispatchToProps = (state: stateType) => {
    return {
        isAuth: state.app.isAuth,
        myId: state.app.id,
        wereRedirectWith: state.app.wereRedirectWith,
        isLoading: state.app.loadingStatus,
        loginMessageError: state.app.loginMessageError
    }
}

export default compose(connect(mapDispatchToProps, {authMeThunk, loginThunk}))(Login)

