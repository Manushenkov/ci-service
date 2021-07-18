import HistoryBlock from './HistoryBlock'
import Button from './Button'
import Modal from './Modal'
import './styles/History.sass'
import axios from 'axios'
import React, { FC } from 'react'
import { BlockData, IVisible } from './interfaces'

import { useState, useEffect } from 'react'

const History: FC<IVisible> = ({ isVisible, setIsVisible }: IVisible) => {
	const link = 'http://localhost:3001/builds'

	const [history, setHistory] = useState<BlockData[]>([])
	const [historySize, setHistorySize] = useState<number>(window.innerWidth <= 768 ? 5 : 9)
	const [isButtonActive, setisButtonActive] = useState(true)

	useEffect(() => {
		axios
			.get(link, {
				params: {
					offset: 0,
					limit: historySize
				}
			})
			.then((res: { data: { data: BlockData[] } }) => {
				setHistory(res.data.data)
				console.log('history', res.data.data)
			})
	}, [historySize])

	const handleClick = () => {
		setHistorySize((prev) => prev + 5)
		if (historySize > history.length) setisButtonActive(false)
	}

	return (
		<>
			<main className='App__history'>
				<div className='container'>
					<ul>
						{history.map((e) => (
							<HistoryBlock key={e.id} data={e} />
						))}
					</ul>
					{isButtonActive && (
						<Button text='Show more' className='button button_gray' onClick={handleClick} />
					)}
				</div>
			</main>
			<Modal setIsVisible={setIsVisible} isVisible={isVisible} />
		</>
	)
}
export default History
