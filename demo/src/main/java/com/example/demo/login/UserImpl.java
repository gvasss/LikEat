//package com.example.demo.login;
//
//import com.example.demo.model.Admin;
//import com.example.demo.model.User;
//import com.example.demo.repository.AdminRepository;
////import com.example.demo.payload.response.LoginMesage;
//import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import java.util.Optional;
//
////import javax.annotation.Resource;
//
//@Service
//public class UserImpl {
//
//    @Autowired
//    private AdminRepository adminRepository;
//
////    @Autowired
////    private PasswordEncoder passwordEncoder;
//
////    @Override
////    public String addUser(User user) {
////        User user = new User(
////                user.getId(),
////                user.getName(),
////                this.passwordEncoder.encode(user.getPassword())
////        );
////        userRepository.save(user);
////        return user.getName();
////    }
////    User user;
//
//    @Override
//    public LoginMesage  loginAdmin(LoginDTO loginDTO) {
//        String msg = "";
//        User user1 = adminRepository.findByUsername(loginDTO.getUsername());
//        if (user1 != null) {
//            String password = loginDTO.getPassword();
////            String encodedPassword = user1.getPassword();
////            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
//            Optional<Admin> admin = adminRepository.findOneByUsernameAndPassword(loginDTO.getUsername(), password);
//            if (admin.isPresent()) {
//                return new LoginMesage("Login Success", true);
//            } else {
//                return new LoginMesage("Login Failed", false);
//            }
//        }else {
//            return new LoginMesage("Username not exits", false);
//        }
//    }
//}
