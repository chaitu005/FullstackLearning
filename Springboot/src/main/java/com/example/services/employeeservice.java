package com.example.services;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.example.bean.employeebean;


@Component



public class employeeservice {
	
	String delimiter = "~";
	
	public employeebean getEmpObj(String employe) {
		String[] words = employe.split(delimiter);
		if(words.length==8) {
			employeebean emp = new employeebean();
			emp.setStudentId(Integer.parseInt(words[0]));
			emp.setFirstName(words[1]);
			emp.setLastName(words[2]);
			emp.setEmail(words[3]);
			emp.setDateOfBirth(words[4]);
			emp.setGender(Integer.parseInt(words[5]));
			emp.setEducation(words[6].split("\\|\\|"));
			emp.setAbout(words[7]);
			return emp;
		}
		return null;
	}
	
	
	public void writeFile(employeebean obj) throws IOException {
		//employeebean obj = getEmpObj(employee);
	    BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt", true));
	    List<employeebean> existingEmps = readFile();

	    String Line = String.valueOf(existingEmps.size()+1)+delimiter+
	    			  obj.getFirstName()+delimiter+
	    			  obj.getLastName()+delimiter+
	    			  obj.getEmail()+delimiter+
	    			  obj.getDateOfBirth()+delimiter+
	    			  String.valueOf(obj.getGender())+delimiter+
	    			  String.join("||", obj.getEducation())+delimiter+
	    			  obj.getAbout();
	    writer.newLine();
	    writer.append(Line);
	    writer.close();
	}
	public List<employeebean> readFile() throws IOException {
 
		FileReader fr=new FileReader("output.txt");
		List<employeebean> objEmployeebeans = new ArrayList<employeebean>();
		BufferedReader buffReader = new BufferedReader(fr);
		while (buffReader.ready()) {
			String Line = buffReader.readLine();
			employeebean emp = getEmpObj(Line);
			if(emp != null) {
				objEmployeebeans.add(emp);
			}
			
        }
		
        //close the file 
        fr.close();
        return objEmployeebeans;
	}
	
	public List<employeebean> searchFile(String key) throws IOException {
		 
		FileReader fr=new FileReader("output.txt");
		List<employeebean> objEmployeebeans = new ArrayList<employeebean>();
		BufferedReader buffReader = new BufferedReader(fr);
		while (buffReader.ready()) {
			String Line = buffReader.readLine();
			employeebean emp = getEmpObj(Line);
			if(emp != null) {
				if(
					emp.getFirstName().toUpperCase().contains(key.toUpperCase())
					|| emp.getLastName().toUpperCase().contains(key.toUpperCase())
					|| emp.getEmail().toUpperCase().contains(key.toUpperCase())
					||key.equals("*"))
				{
					objEmployeebeans.add(emp);
				}
			}
			
        }
		
        //close the file 
        fr.close();
        return objEmployeebeans;
	}

}
