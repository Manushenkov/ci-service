import HistoryBlock from './HistoryBlock'
import Header from './Header'
import axios from 'axios'
import './styles/Details.sass'
import { useLocation } from 'react-router-dom'
import { useState, useEffect, FC } from 'react'
import { Redirect } from 'react-router-dom'
import React from 'react'

import cog from './public/cog.svg'
import rebuild from './public/rebuild.svg'

import Convert from 'ansi-to-html'
import { BlockData, IBuildDetails, IButtonProps, IPostResponse } from './interfaces'
const convert = new Convert()

const Details: FC = () => {
	const number = useLocation().pathname.split('/').pop()

	const [repoName, setRepoName] = useState('')

	const settingsLink = 'http://localhost:3001/settingsGet'
	useEffect(() => {
		axios.get(settingsLink).then(({ data }) => {
			setRepoName(data.repoName);
		});
	}, []);




	const postLink = 'http://localhost:3001/buildsPost/'
	const headerButtons: IButtonProps[] = [
		{
			src: rebuild,
			text: 'Rebuild',
			cb: () => {
				axios.get(postLink + hash).then((res: IPostResponse) => {
					setId(res.data.id)
				})
			}
		},
		{
			src: cog,
			text: '',
			href: `/settings`
		}
	]

	const link = `http://localhost:3001/builds/${number}`
	const [historyBlock, setHistoryBlock] = useState<BlockData>()
	const [logs, setLogs] = useState<string>('')
	const [id, setId] = useState<string>('')
	const [hash, setHash] = useState<string>('')

	useEffect(() => {
		axios.get(link).then((res: {data: IBuildDetails}) => {
			setHistoryBlock(res.data.data)
			setHash(res.data.data.commitHash)
			console.log(res.data.data, 'dsfg')
		})
	}, [link])

	useEffect(() => {
		axios.get(link + '/logs').then((res: {data: string}) => {
			setLogs(res.data)
		})
	}, [link])

	return (
		<>
			{id ? <Redirect push to={'/build/' + id} /> : null}

			<Header title={repoName} buttons={headerButtons} />

			<main className='App__details'>
				<div className='container'>
					{historyBlock ? <HistoryBlock data={historyBlock} /> : ''}
					<p className='commitMessage'>{convert.toHtml(logs)}</p>
				</div>
			</main>
		</>
	)
}
export default Details
