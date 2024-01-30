#include <iostream>
#include <fstream>
#include <filesystem>
#include <opencv2/opencv.hpp>

int main(int argc, char **argv) {
    // Get filepath of image; default to uploaded.jpg if no image is specified
    std::string filepath = std::filesystem::absolute("../img/" + std::string(argc > 1 ? argv[1] : "uploaded.jpg")).string();
    cv::Mat image = cv::imread(filepath, cv::IMREAD_COLOR);

    // Exit if image file could not be read
    if (image.empty()) {
        std::cout << "Error: could not read image file" << std::endl;
        return 1;
    }

    // Create map of RGB codes and their frequencies in the image
    std::map<std::vector<int>, int> rgb_map;

    // Iterate thorugh each pixel in the image
    for (int i = 0; i < image.rows; i++) {
        for (int j = 0; j < image.cols; j++) {
            // Get current pixel
            cv::Vec3b pixel = image.at<cv::Vec3b>(i, j);

            // Increment count of current pixel in map
            rgb_map[{pixel[2], pixel[1], pixel[0]}]++;
        }
    }

    // Sort map by frequency in descending order
    std::vector<std::pair<std::vector<int>, int>> rgb_vec(rgb_map.begin(), rgb_map.end());
    std::sort(rgb_vec.begin(), rgb_vec.end(), [](const std::pair<std::vector<int>, int> &a, const std::pair<std::vector<int>, int> &b) {
        return a.second > b.second;
    });

    // Print contents of sorted vector to file
    // std::string image_no_ext = image_name.substr(0, image_name.find_last_of("."));
    // std::ofstream dout("res/out/" + image_no_ext + ".csv");
    // dout << "R-G-B Value,Hex Code,Frequency" << std::endl;
    // for (auto &color : rgb_vec) {
    //     // Get RGB values
    //     std::vector<int> rgb = color.first;

    //     // Convert RGB to hex code
    //     std::stringstream hex_code;
    //     hex_code << std::hex << std::setfill('0') << std::setw(2) << rgb[0] << std::setw(2) << rgb[1] << std::setw(2) << rgb[2];

    //     // Print RGB, hex code, and frequency to file
    //     dout << rgb[0] << "-" << rgb[1] << "-" << rgb[2] << "," << hex_code.str() << "," << color.second << std::endl;
    // }
    // dout.close();

    // Create color palette image of all colors in the image
    cv::Mat palette = cv::Mat::zeros(1000, 1000, CV_8UC3);

    // Draw 100 most common colors onto the palette image
    for (int i = 0; i < 100; i++) {
        // Get current color
        std::vector<int> color = rgb_vec[i].first;

        // Define the number of blocks per row
        int blocks_per_row = palette.cols / 100;

        // Draw a 100x100 rectangle of the current color onto the palette image
        for (int j = 0; j < 100; j++) {
            for (int k = 0; k < 100; k++) {
                // Calculate the row and column for the current block
                int row = (i / blocks_per_row) * 100 + j;
                int col = (i % blocks_per_row) * 100 + k;

                // Make sure we're not going out of the image bounds
                if (row < palette.rows && col < palette.cols) {
                    palette.at<cv::Vec3b>(row, col)[0] = color[2];
                    palette.at<cv::Vec3b>(row, col)[1] = color[1];
                    palette.at<cv::Vec3b>(row, col)[2] = color[0];
                }
            }
        }

        // Get current color's hex code
        std::stringstream hex_code;
        hex_code << std::hex << std::setfill('0') << std::setw(2) << color[0] << std::setw(2) << color[1] << std::setw(2) << color[2];
        
        // Calculate font color based on brightness of current color (light colors get black font, dark colors get white font)
        int font_color = (color[0] + color[1] + color[2]) / 3 > 128 ? 0 : 255;

        // Print current color's hex code onto the palette image
        cv::putText(palette, hex_code.str(), cv::Point((i % blocks_per_row) * 100 + 25, (i / blocks_per_row) * 100 + 50), cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(font_color, font_color, font_color), 1, cv::LINE_AA);
    }

    // Write palette image to file
    cv::imwrite(std::filesystem::absolute("../img/palette.jpg").string(), palette);

    return 0;
}