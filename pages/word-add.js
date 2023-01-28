
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material"
import { useState, useEffect } from 'react'

export default function Home() {
    const [users, setUsers] = useState([])
    const [firstExist, setFirstExist] = useState(false)
    const [firstValue, setFirstValue] = useState("")
    const [secondExist, setSecondExist] = useState(false)
    const [secondValue, setSecondValue] = useState("")
    const [answer, setAnswer] = useState("??");
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [init , setInit] = useState(true);
    const fetchFirstExist = async (word) => {
        const response = await fetch("/api/exist", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({ key: word })
        })
        const data = await response.json()
        setFirstExist(data.bool)
    }
    const fetchSecondExist = async (word) => {
        const response = await fetch("/api/exist", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({ key: word })
        })
        const data = await response.json()
        setSecondExist(data.bool)
    }
    const fetchAnswer = async (word1, word2) => {
        setLoading(true);
        const response = await fetch("/api/answer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({ word1: word1, word2: word2 })
        })
        const data = await response.json()
        setOpen(true);
        setLoading(false);
        setAnswer(data.answer)
    }
    const handleRandom = async () => {
        const response = await fetch('/api/word2vec')
        const data = await response.json()
        setFirstValue(data.vector[0])
        setSecondValue(data.vector[1])
        setFirstExist(true);
        setSecondExist(true);
    }
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/word2vec')
            const data = await response.json()
            setUsers(data.vector)
        }
        fetchUsers()
        setInit(false);
    }, [])
    const handleFirstChange = (e) => {
        setFirstValue(e.target.value);
        fetchFirstExist(e.target.value);
    }
    const handleSecondChange = (e) => {
        setSecondValue(e.target.value);
        fetchSecondExist(e.target.value);
    }
    const handleClose = (e) => {
        setError(false);
        setOpen(false);
        setInit(false);
    }
    const handleSubmit = (e) => {
        if (firstExist && secondExist) {
            fetchAnswer(firstValue, secondValue);
        } else {
            setError(true);
        }
    }
    return (
        <div className={styles.container}>
            <Box sx={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box>
                    <Box sx={{ display: "flex", justifyContent: "center", padding: "32px" }}>
                        <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>文字の足し引き (例:女王-王)</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <TextField onChange={handleFirstChange} error={!firstExist} placeholder={users[0]} value={firstValue}></TextField>
                        <p>-</p>
                        <TextField onChange={handleSecondChange} error={!secondExist} placeholder={users[1]} value={secondValue}></TextField>
                        <p>=</p>
                        <Button variant="contained" onClick={handleSubmit}>計算する</Button>
                        <Button variant="contained" onClick={handleRandom} color="success" sx={{ mx: "16px" }}>ランダム</Button>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", padding: "32px" }}>
                        <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>答え:{loading ? "計算中..." : answer}</Typography>
                    </Box>
                </Box>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="計算成功！"
            >
                <Alert severity="success">計算完了！</Alert>
            </Snackbar>
            <Snackbar
                open={init}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity="success">データ準備中...</Alert>
            </Snackbar>
            <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity="error">その単語は登録されていません！</Alert>
            </Snackbar>
        </div>
    )
}
