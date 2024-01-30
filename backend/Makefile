CXX=g++
CXXFLAGS=-std=c++17 -Wall -g0
OPENCV_LIBS=`pkg-config --cflags --libs opencv4`

SRCS = src/generate_palette.cpp
TARGET = bin/generate_palette

all: $(TARGET)

$(TARGET): $(SRCS)
	$(CXX) $(CXXFLAGS) $(SRCS) -o $(TARGET) $(OPENCV_LIBS)

clean:
	rm -f $(TARGET)