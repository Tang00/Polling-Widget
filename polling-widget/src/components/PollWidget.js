import React, { useState } from "react"
import { useQuery, useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import CountUp from 'react-countup';
import "./css/PollWidget.css"
import "./css/RadioButton.css"

const PollWidget = ({pollId}) => {

    const [selected, setSelected] = useState()
    const [seeResults, setSeeResults] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const GET_POLL_INFO = loader('../graphql/queries/poll.gql')
    const MAKE_VOTE = loader('../graphql/mutations/vote.gql')

    let {data, loading, error} = useQuery(GET_POLL_INFO, {variables: {pollId: pollId}})
    const [makeVote] = useMutation(MAKE_VOTE, {
        refetchQueries: [
            {query: GET_POLL_INFO},
            'Poll'
        ]
    });

    if (loading) return null
    if (error) {
        console.log(error)
        return null
    }
    
    const { prompt, responses, totalVotes } = data?.poll || {}

    const onSubmit = async () => {
        makeVote({ variables: { id: selected?.id }})
        setSeeResults(true)
        setSubmitted(true)
        const voted = localStorage.getItem('voted')
        if (voted) {
            const votedArray = JSON.parse(voted)
            votedArray.push(pollId)
            localStorage.setItem('voted', JSON.stringify(votedArray))
        }
        else {
            localStorage.setItem('voted', JSON.stringify([pollId]))
        }
    }

    //check if user has already voted on poll
    const storage = localStorage.getItem('voted')
    let hasVoted = false
    if (storage) {
        hasVoted = JSON.parse(storage).includes(pollId)
    }

    //boolean value to determine which components to show
    const showAsVoted = submitted || seeResults || hasVoted

    //the response with the most votes
    const winner = responses.reduce((prev, curr) => {
        return (prev.votes > curr.votes) ? prev : curr
    })

    return (
        <div className="poll-widget">
            <Prompt text={prompt}/>
            <hr width={"100%"} align={"left"} color={"#8a9399"}/>
            {showAsVoted ? <Results {...{responses, selected, totalVotes, winner}}/> : <Responses {...{responses, selected, setSelected}}/>}
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                {showAsVoted ? null : <SubmitButton {...{onSubmit, selected}} />}
                {showAsVoted ? null : <SeeResultsButton {...{setSeeResults}} />}
            </div>
        </div>
    )
}

const Responses = ({responses, selected, setSelected}) => {
    return (
        <div className="results-container">
            {responses.map(response => (
                <Response key={response.id} 
                {...{response, selected, setSelected}}/>
            ))}
        </div>
    )
}

const Response = ({response, selected, setSelected}) => {
    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent:"space-between"}}>
            <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
                <RadioButton checked={response.id===selected?.id} onChange={() => {setSelected(response)}} />
                <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                    <div className="response-text">
                        {response.response}
                    </div>
                    <VoteBar picked={response.id===selected?.id} visible={false}/>
                </div>
            </div>
        </div>
    )
}

const Results = ({responses, selected, totalVotes, winner}) => {
    return (
        <div className="results-container">
            {responses.map(response => (
                <Result key={response.id}
                {...{response, selected, totalVotes, winner}}/>
            ))}
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <div className="response-text">Thank you 🎉</div>
                <div className="response-text">{totalVotes.toLocaleString()} votes</div>
            </div>
            
        </div>
    )
}

const Result = ({response, selected, totalVotes, winner}) => {

    const percentage = totalVotes === 0 ? 0 : response.votes/totalVotes*100

    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent:"space-between"}}>
            <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
                <RadioButton checked={response.id===selected?.id} disabled={true}/>
                <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                    <div className="results-text">
                        {response.response}
                    </div>
                    <VoteBar isWinner={response === winner} width={percentage} visible={true}/>
                </div>
            </div>
            <div className="percent-text">
                <CountUp start={0} end={percentage} duration={2} decimals={2} delay={0} suffix={"%"}>
                    {({countUpRef, start }) => (
                        <div>
                            <span ref={countUpRef} />
                        </div>
                    )}
                </CountUp>
            </div>
        </div>
    )
}

const VoteBar = ({isWinner, width, visible}) => {
    let hrClass = ""
    if (isWinner) {
        hrClass = "winner-bar"
    }
    else {
        hrClass = "vote-bar"
    }

    return (
        <div style={{visibility: visible ? "visible" : "hidden", width: width+"%"}}>
            <hr className={hrClass}/>
        </div>
    )
}

const Prompt = ({text}) => {
    return (
        <div className="prompt-text">{text}</div>
    )
}

const SubmitButton = ({onSubmit, selected}) => {
    return (
        <button onClick={() => onSubmit()} disabled={selected == null} className="submit-button">
            Submit
        </button>
    )
}

const SeeResultsButton = ({setSeeResults}) => {
    return <button onClick={() => setSeeResults(true)} className="see-results-button">
        See Results {">"}
    </button>
}

const RadioButton = ({disabled=false, checked, onChange}) => {
    return (
        <label class="container">
            <input type="radio" checked={checked} onChange={onChange} disabled={disabled}/>
            <span class="checkmark"></span>
        </label>
    )
}

export default PollWidget;