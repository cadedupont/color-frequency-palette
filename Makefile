CXX=g++
CXXFLAGS=-std=c++17 -Wall -g0
OPENCV_LIBS=`pkg-config --cflags --libs opencv4`

SRCS = src/color_frequency.cpp
TARGET = color_frequency

all: $(TARGET)

$(TARGET): $(SRCS)
	$(CXX) $(CXXFLAGS) $(SRCS) -o $(TARGET) $(OPENCV_LIBS)

clean:
	rm -f $(TARGET)