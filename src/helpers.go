package infra

import (
	"fmt"
	"io/ioutil"
	"os"
	"strings"
)

func ReadFileContent(filePath string) (string, error) {
	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		return "", err
	}
	return string(data), nil
}

func ReadFileLines(filePath string) ([]string, error) {
	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		return nil, err
	}
	return strings.Split(string(data), "\n"), nil
}

func ReadFileLinesWithIndex(filePath string) ([]int, error) {
	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		return nil, err
	}
	return ParseLines(data, func(line int) int {
		return line + 1
	}, nil)
}

func ParseLines(data []byte, parser func(int) int, err func() error) ([]int, error) {
	var result []int
	for _, line := range strings.Split(string(data), "\n") {
		if err := parser(line); err != nil {
			return nil, err
		}
		result = append(result, ParseInt(line))
	}
	return result, nil
}

func ParseInt(s string) int {
	if len(s) == 0 {
		return 0
	}
	return int(s)
}