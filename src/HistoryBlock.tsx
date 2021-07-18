import processDate from './processDate'
import React from 'react'
import { BlockData } from './interfaces'
import { FC } from 'react'

const HistoryBlock: FC<{data: BlockData}> = ({ data }: {data: BlockData}) => {
	let statusClass: string
	if (data.status === 'Success') {
		statusClass = 'history__status-succ'
	} else if (data.status === 'InProgress' || data.status === 'Waiting') {
		statusClass = 'history__status-wait'
	} else {
		statusClass = 'history__status-fail'
	}

	return (
		<li className='history__block'>
			<div className='history__main'>
				<div className='history__title'>
					<div className={'title__id ' + statusClass}>#{data.buildNumber}</div>
					<div className='title__title'>{data.commitMessage}</div>
				</div>
				<div className='history__info'>
					<div className='info__branch'>{data.branchName}</div>
					<div className='info__hash'>{data.commitHash.slice(0, 7)}</div>
					<div className='info__name'>{data.authorName}</div>
				</div>
			</div>
			<div className='history__time'>
				{processDate(data) ? <div className='time__date'>{processDate(data)}</div> : ''}
				{data.duration ? (
					<div className='time__time'>
						{Math.floor(data.duration / 60)} ч {data.duration % 60} мин
					</div>
				) : (
					''
				)}
			</div>
		</li>
	)
}
export default HistoryBlock
