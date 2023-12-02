package com.shop.api.utils;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;

public class ProjectFileCR {

    public static void writeFile(String name, String workPath, MultipartFile file) throws IOException {

        File file_ = new File(workPath + name);

        if (!file_.createNewFile()) {
            System.out.println("Ошибка создания файла IOException");
            return;
        }
        try {
            Files.write(file_.toPath(), file.getBytes());
        } catch (IOException e) {
            System.out.println("Ошибка записи в файл IOException");
        }
    }

    public static void writeFile(String name, String workPath, MultipartFile file, boolean isRewriting) throws IOException {

        File file_ = new File(workPath + name);


        if (!file_.createNewFile()) {

            if(!isRewriting) {
                System.out.println("Ошибка создания файла IOException");
                return;
            }
        }
        try {
            Files.write(file_.toPath(), file.getBytes());
        } catch (IOException e) {
            System.out.println("Ошибка записи в файл IOException");
        }
    }

    public static HttpEntity<byte[]> readImage (String imageName, String path) {
        try(FileInputStream fis = new FileInputStream(path + imageName)){

            byte[] image = fis.readAllBytes();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            headers.setContentLength(image.length);

            return new HttpEntity<>(image, headers);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
