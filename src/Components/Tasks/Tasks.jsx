import React, { useEffect, useState } from 'react'
import { List, Space, Card, Pagination, Cascader } from 'antd'
import Text from 'antd/lib/typography/Text'
import { useDispatch, useSelector } from 'react-redux'
import { getTasksSagasAC, postChangeTaskSagasAC, setPageAC, setSortOnAC, setSortTypeAC } from '../../store/pageReducer'
import { getIsAuth, getTasksSelector, getDoneTypes, getToken, getSortTypes, getSortOnTypes, getTotalTasksCount } from '../../store/pageSelectors'
import TextArea from 'antd/lib/input/TextArea'

export const Tasks = (props) => {

    const dispatch = useDispatch()

    const tasks = useSelector(getTasksSelector)
    const isAuth = useSelector(getIsAuth)
    const doneTypes = useSelector(getDoneTypes)
    const token = useSelector(getToken)
    const sortTypes = useSelector(getSortTypes)
    const sortOnTypes = useSelector(getSortOnTypes)
    const totalPageCount = useSelector(getTotalTasksCount)

    const [textAreaValue, setTextAreaValue] = useState('')

    const setOptions = (id) => {
        let options = []
        for (const key in doneTypes) {
            options.push({value: key, label: doneTypes[key], id: id})
        }
        return options
    }

    const onDoneChange = (value, selectedOptions) => {
        let formData = new FormData()
        formData.append('id', selectedOptions[0].id)
        formData.append('status', value)
        formData.append('token', token)
        dispatch(postChangeTaskSagasAC(formData))
    }

    const sortOnTypesChange = (value) => {
        dispatch(setSortOnAC(value))
        dispatch(getTasksSagasAC())
    }

    const sortTypesChange = (value) => {
        dispatch(setSortTypeAC(value))
        dispatch(getTasksSagasAC())
    }

    const paginationChenge = (value) => {
        dispatch(setPageAC(value))
        dispatch(getTasksSagasAC())
    }

    const onChangeTextAreaValue = (value) => {
        setTextAreaValue(item => [...item, value.currentTarget.value])
    }

    const confirmTextAreaChenges = (id) => {
        let formData = new FormData()
        formData.append('id', id)
        formData.append('text', textAreaValue)
        dispatch(postChangeTaskSagasAC(formData))
    }

    useEffect(() => {
        dispatch(getTasksSagasAC())
    }, [dispatch])

    return (
        <div style={{ textAlign: 'center' }}>
            <Space>
            <Text>Сортировать по</Text>
            <Cascader options={sortOnTypes} onChange={sortOnTypesChange} />
            <Text>Сортировать в порядке</Text>
            <Cascader options={sortTypes} onChange={sortTypesChange} />
            </Space>
            <List
                itemLayout="vertical"
                size="medium"
                dataSource={tasks}
                renderItem={item => (
                    <Space>
                        <Card title={`${item.username} | ${item.email}`} extra={isAuth ? <Cascader options={setOptions(item.id)} onChange={onDoneChange} defaultValue={[doneTypes[item.status]]} /> : doneTypes[item.status]} bordered style={{ width: 1000 }} >
                            {isAuth 
                            ? <TextArea rows={4} autoSize={true} defaultValue={item.text} onChange={onChangeTextAreaValue} onBlur={() => confirmTextAreaChenges(item.id)} /> 
                            : <Text style={{ margin: 30 }}>{item.text}</Text>}
                        </Card>
                    </Space>
                )}
            />
            <Pagination defaultCurrent={1} total={totalPageCount} defaultPageSize={3} onChange={paginationChenge} />
        </div>
    )
}