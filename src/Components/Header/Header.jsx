import { Button, Space } from 'antd'
import React, { useState } from 'react'
import { Layout } from 'antd'

import 'antd/dist/antd.css'
import Modal from 'antd/lib/modal/Modal'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { postLoginSagasAC, postNewTaskSagasAC } from '../../store/pageReducer'
import { getIsAuth } from '../../store/pageSelectors'
import Avatar from 'antd/lib/avatar/avatar'
import { UserOutlined } from '@ant-design/icons'
import Text from 'antd/lib/typography/Text'

const { Header } = Layout

export const HeaderComponent = (props) => {

    const isAuth = useSelector(getIsAuth)

    const [isTaskModalVisible, setIsTaskModalVisible] = useState(false)
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false)

    const dispatch = useDispatch()

    const addTask = () => {
        setIsTaskModalVisible(true)
    }

    const handleNewTaskCancel = () => {
        setIsTaskModalVisible(false)
    }
    const login = () => {
        setIsLoginModalVisible(true)
    }
    const handleLoginCancel = () => {
        setIsLoginModalVisible(false)
    }

    return (
        <Header style={{ textAlign: 'right' }}>
            <div className="logo" />
            <Space size='large'>
                <Button type="primary" onClick={addTask}>Добавить задачу</Button>
                <div>
                {isAuth ? <><Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> <Text type="success">Admin</Text></> : <Button type="primary" onClick={login}>Log in</Button> }
                </div>
            </Space>
            <Modal title="Добавить задачу" visible={isTaskModalVisible} onCancel={handleNewTaskCancel} footer={[]} style={{ width: 700 }}>
                <Formik
                    initialValues={{ username: '', email: '', text: '' }}
                    validate={values => {
                        const errors = {}
                        if (!values.email) {
                            errors.email = 'Поле email должно быть заполненно!'
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Неверный email'
                        } else if (!values.username) {
                            errors.username = 'Поле имя пользователя должно быть заполненно!'
                        } else if (!values.text) {
                            errors.text = 'Поле текст должно быть заполненно!'
                        }
                        return errors
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        let formData = new FormData()
                        formData.append('username', values.username)
                        formData.append('email', values.email)
                        formData.append('text', values.text)
                        dispatch(postNewTaskSagasAC(formData))
                        setTimeout(() => {
                            setSubmitting(false)
                            setIsTaskModalVisible(false)
                        }, 400)
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                            <Space direction="vertical">
                            <div>
                            <input
                                type="text"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                                style={{ width: '100%' }}
                            />
                            {errors.username && touched.username && errors.username}
                            </div>
                            <div>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                style={{ width: '100%' }}
                            />
                            {errors.email && touched.email && errors.email}
                            </div>
                            <div>
                            <input
                                type="text"
                                name="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.text}
                                style={{ width: '100%' }}
                            />
                            {errors.text && touched.text && errors.text}
                            </div>
                            <button type="submit" disabled={isSubmitting}>
                                Добавить задачу
                            </button>
                            </Space>
                        </form>
                    )}
                </Formik>
            </Modal>
            <Modal title="Basic Modal" visible={isLoginModalVisible} onCancel={handleLoginCancel} footer={[]} style={{ width: 700 }}>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validate={values => {
                        const errors = {}
                        if (!values.username) {
                            errors.username = 'Поле логин должно быть заполненно!'
                        } else if (!values.password) {
                            errors.password = 'Поле пароль должно быть заполненно!'
                        }
                        return errors
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        let formData = new FormData()
                        formData.append('username', values.username)
                        formData.append('password', values.password)
                        dispatch(postLoginSagasAC(formData))
                        setTimeout(() => {
                            setSubmitting(false)
                            setIsLoginModalVisible(false)
                        }, 400)
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                            <Space direction="vertical">
                            <div>
                            <input
                                type="username"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                                style={{ width: '100%' }}
                            />
                            {errors.username && touched.username && errors.username}
                            </div>
                            <div>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                style={{ width: '100%' }}
                            />
                            {errors.password && touched.password && errors.password}
                            </div>
                            <button type="submit" disabled={isSubmitting}>
                                Авторизоваться
                            </button>
                            </Space>
                        </form>
                    )}
                </Formik>
            </Modal>
        </Header>
    )
}