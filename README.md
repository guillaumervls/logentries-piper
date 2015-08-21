# Logentries Piper
Pipe a command's output to [Logentries](https://logentries.com/) and forward it to the standard output as well.

## Install

```
npm install (-g) logentries-piper
```

## Use

```
COMMAND | logentries-piper
```

If you want to also pipe stderr :

```
COMMAND 2>&1 | logentries-piper
```

Pass your Logentries token :
- as `LOGENTRIES_TOKEN` environment variable
- with `--token <TOKEN>` argument (prevails on the env. var.)

### License
MIT
