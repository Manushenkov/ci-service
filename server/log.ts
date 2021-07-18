import git from 'nodegit'

const getCommitByHash = (hash: string): Promise<any> => {
    return git.Repository.open('repo')
    .then((r: { getCommit: (arg0: any) => any }) => r.getCommit(hash))
}
    
export { getCommitByHash }