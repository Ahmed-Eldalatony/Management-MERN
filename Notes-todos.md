# Todo

- implement protected routes
- responsive layout
- Access cookie

# Notes

Mongoose Schema validation is terrible, Use custom middleware validation instead

# Different implementations

## login with redux

```js
setIsLoading(true);
setError(null);

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
})
  .then((response) => {
    if (!response.ok) {
      response.json().then((data) => {
        setError(data.message);
      });
    }
    return response.json();
  })
  .then((data) => {
    console.log("this is the data", data.user);

    dispatch(setUser(data.user));
    // if (data.user) navigate("/");
    setIsLoading(false);
  })
  .catch((error) => {
    setError(error.message || "An error occurred");
    setIsLoading(false);
  });
```

```js
const handleAdvancedInput = (e) => {
  // if space is pressed, create a new paragraph

  const para = document.createElement("p");
  para.textContent = currentWord;

  if (e.nativeEvent.data === " ") {
    inputRef.current?.appendChild(para);
    setCurrentWord("");
  } else {
    setCurrentWord([...currentWord, e.nativeEvent.data].join(""));
  }
  setInput(e.target.textContent);

  console.log(currentWord);
  // console.log("space pressed");
  // setInput(e.target.textContent);

  // para.textContent = inputRef.current?.appendChild(para);
  if (e.target.textContent === "test") {
    // return (e.target.textContent = "<span>test1</span>");
  }
};
<div
  ref={inputRef}
  onInput={(e) => handleAdvancedInput(e)}
  contentEditable="true"
  id="text"
>
  placeholder
</div>;
```
