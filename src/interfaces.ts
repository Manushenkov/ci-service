import { Dispatch, SetStateAction } from "react";

type Status = 'Waiting' | 'InProgress' | 'Success' | 'Fail' | 'Canceled'


export interface IVisible {
	isVisible: boolean;
	setIsVisible: Dispatch<SetStateAction<boolean>>
}

export interface IRoute {
	path: string
	component: React.FC
	exact: boolean
}

export interface IRepoName {
	repoName: string;
	setRepoName: Dispatch<SetStateAction<string>>
}

export interface IButtonProps {
	src: string
	text: string
	cb?: () => void
	href?: string
}

export interface IButton {
	text: string
	href?: string
	className: string
	onClick?: () => void
}

export interface ISettingsButton {
	src: string;
	text: string;
	href?: string;
	cb?(): void
}

export interface IHeader {
	title: string
	buttons?: ISettingsButton[]
}

export interface BlockData {
	status: 'Waiting' | 'InProgress' | 'Success' | 'Fail' | 'Canceled'
	buildNumber: number
	id: string
	commitMessage: string
	branchName: string
	commitHash: string
	authorName: string
	duration: number
	start: string

}

export interface IPostData {
	commitMessage: string
	commitHash: string
	branchName: string
	authorName: string
}

export interface IPostResponse {
	data: {
		id: string
		buildNumber: number
		status: Status
	}
}

export interface IBuildDetails {
	data: {
		id: string
		configurationId: string
		buildNumber: number
		status: Status
		commitMessage: string
		commitHash: string
		branchName: string
		authorName: string
		start: string
		duration: number
	}
}

export interface ISettings {
	data: {
		id: string
		repoName: string
		buildCommand: string
		mainBranch: string
		period: number
	}
}